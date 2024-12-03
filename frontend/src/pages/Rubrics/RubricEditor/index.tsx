import { useContext, useEffect, useState } from "react";

import "./styles.css";
import Button from "@/components/Button";
import Input from "@/components/Input";
import RubricItem from "@/components/RubricItem";
import { ItemFeedbackType } from "@/components/RubricItem";
import { createRubric, updateRubric } from "@/api/rubrics";
import { SelectedClassroomContext } from "@/contexts/selectedClassroom";
import { setAssignmentRubric } from "@/api/assignments";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";


interface IEditableItem {
    frontFacingIndex: number;
    rubricItem: IRubricItem;
    impact: ItemFeedbackType
}

interface IRubricLineItem {
    explanation: string;
    point_value: number | null;
    impact: ItemFeedbackType;
}

const RubricEditor: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate();

    const { selectedClassroom } = useContext(SelectedClassroomContext)

    // potential data for the assignment
    const [assignmentData, setAssignmentData] = useState<IAssignmentOutline>()
    //data for the rubric
    const [rubricData, setRubricData] = useState<IFullRubric>()
    const [rubricItemData, setRubricItemData] = useState<IEditableItem[]>([])
    const [rubricName, setRubricName] = useState<string>("")

    // if there has been any changes since last save
    const [rubricEdited, setRubricEdited] = useState(false)

    //error handling
    const [failedToSave, setFailedToSave] = useState(false)
    const [invalidPointValue, setInvalidPointValue] = useState(false)
    const [invalidExplanation, setInvalidExplanation] = useState(false)
    const [invalidPointImpact, setInvalidPointImpact] = useState(false)


    // front end id for each rubric item, kept track of using a counter
    const [itemCount, setitemCount] = useState(0);
    const incrementCount = () => setitemCount(itemCount + 1);

    // default item for adding new items
    const newRubricItem: IEditableItem = {
        frontFacingIndex: itemCount,
        rubricItem: {
            id: null,
            point_value: null,
            explanation: "",
            rubric_id: null,
            created_at: null
        },
        impact: ItemFeedbackType.Neutral
    }

    const backButton = () => {
        navigate(-1);
    }
    // saving the rubric, creates a rubric in the backendindex
    const saveRubric = async () => {
        if (selectedClassroom !== null && selectedClassroom !== undefined && rubricEdited) {
            const rubricItems = (rubricItemData.map(item => item.rubricItem));

            //validate items
            for (const item of rubricItems) {
                // check each explanation contains something
                if (item.explanation === "") {
                    setInvalidExplanation(true)
                    setFailedToSave(true)
                    return;
                }

                // check each point value has some data
                if (item.point_value === null || item.point_value === undefined) {
                    setInvalidPointValue(true);
                    setFailedToSave(true);
                    return;
                }
            }
            setInvalidPointValue(false)
            setInvalidExplanation(false)

            // check all non zero valued items have a selected impact
            for (const item of rubricItemData) {
                if (item.impact === ItemFeedbackType.Neutral && item.rubricItem.point_value !== 0) {
                    setInvalidPointImpact(true)
                    setFailedToSave(true)
                    return;
                }
            }
            setInvalidPointImpact(false)


            const fullRubric: IFullRubric = {
                rubric: {
                    id: null,
                    name: rubricName,
                    org_id: selectedClassroom.org_id,
                    classroom_id: selectedClassroom.id,
                    reusable: true,
                    created_at: null
                },
                rubric_items: rubricItems
            }

            // update existing rubric
            if (rubricData) {
                await updateRubric(rubricData.rubric.id!, fullRubric)
                    .then((updatedRubric) => {
                        setRubricEdited(false)
                        setFailedToSave(false)
                        setRubricData(updatedRubric)
                        if (assignmentData !== null && assignmentData !== undefined) {
                            setAssignmentRubric(updatedRubric.rubric.id!, selectedClassroom.id, assignmentData.id)
                        }
                        navigate(-1)
                    })
                    .catch((_) => {
                        setFailedToSave(true)
                    });

                // create new rubric
            } else {
                await createRubric(fullRubric)
                    .then((createdRubric) => {
                        setRubricEdited(false)
                        setFailedToSave(false)
                        setRubricData(createdRubric)
                        if (assignmentData !== null && assignmentData !== undefined) {
                            setAssignmentRubric(createdRubric.rubric.id!, selectedClassroom.id, assignmentData.id)
                        }
                        navigate(-1)
                    })
                    .catch((_) => {
                        setFailedToSave(true)
                    });
            }
        } else if (invalidPointValue || invalidExplanation) {
            setFailedToSave(true)
        }
    };

    // handles when any rubric item is updated
    const handleItemChange = (id: number, updatedFields: Partial<IRubricLineItem>) => {
        setRubricEdited(true);

        setRubricItemData((prevItems) =>
            prevItems.map((item) =>
                item.frontFacingIndex === id
                    ? {
                        ...item,
                        ...updatedFields,
                        rubricItem: {
                            ...item.rubricItem,
                            ...updatedFields,
                        },
                    }
                    : item
            )
        );
    };



    // handles when the rubric's name is changed
    const handleNameChange = (newName: string) => {
        setRubricName(newName)
        console.log("name changes")
    }

    // handles adding another rubric item
    const addNewItem = () => {
        setRubricEdited(true)
        console.log("new item")

        setRubricItemData([...rubricItemData, newRubricItem]);
        incrementCount()
    };

    const determinePointImpact = (point_value: number) => {
        if (point_value == 0) {
            return ItemFeedbackType.Neutral
        }
        return point_value > 0 ? ItemFeedbackType.Addition : ItemFeedbackType.Deduction
    }

    const deleteItem = (item_id: number) => {
        if (rubricItemData.length > 1) {
            setRubricEdited(true)
            setRubricItemData((prevItems) => 
                prevItems.filter((item) => item.frontFacingIndex !== item_id)
            );
        }
        
    }

    // on startup, store an assignment if we have one 
    // Also make sure there is atleast one editable rubric item already on the screen
    useEffect(() => {
        if (location.state) {
            if (location.state.assignment && location.state.rubricData) {
                const assignment = location.state.assignment
                setAssignmentData(assignment)
                const rubric = location.state.rubricData
                setRubricData(rubric)
                setRubricName(`${assignment.name} Rubric`)

            } else if (location.state.assignment && !location.state.rubricData) {
                const assignment = location.state.assignment
                setAssignmentData(assignment)
                setRubricName(`${assignment.name} Rubric`)
            } else if (location.state.rubricData) {
                const rubric = location.state.rubricData
                setRubricData(rubric)
                setRubricName(rubric.rubric.name)

            }
        } else {
            setRubricName("New Rubric")
            addNewItem()
        }

    }, [location.state]);

    useEffect(() => {
        if (rubricData) {
            let localCount = itemCount
            const editableItems = rubricData.rubric_items.map((item) => {
                const editableItem: IEditableItem = {
                    rubricItem: item,
                    frontFacingIndex: localCount,
                    impact: determinePointImpact(item.point_value ?? 0)
                };
                localCount++;
                return editableItem;
            });
            setitemCount(localCount)
            setRubricItemData(editableItems)
        }
    }, [rubricData])

    return (
        <div className="NewRubric__body">
            <div className="NewRubric__title">
                {assignmentData !== null && assignmentData !== undefined ? `${assignmentData.name} > ` : ""}
                {rubricData !== null && rubricData !== undefined ? "Edit Rubric" : "New Rubric"}
                {rubricEdited ? "*" : ""}
            </div>

            {failedToSave &&
                <div className="NewRubric__title__FailedSave">
                    {"Couldn't save rubric. Please try again."}
                </div>
            }

            {failedToSave && invalidPointValue &&
                <div className="NewRubric__title__FailedSave">
                    {" - Point values cannot be empty."}
                </div>
            }

            {failedToSave && invalidExplanation &&
                <div className="NewRubric__title__FailedSave">
                    {" - Item explanations cannot be empty."}
                </div>
            }

            {failedToSave && invalidPointImpact &&
                <div className="NewRubric__title__FailedSave">
                    {" - Point impact cannot be empty for non-zero values."}
                </div>
            }


            <Input
                label="Rubric name"
                name="rubric-name"
                placeholder="Enter a name for your classroom..."
                required
                value={rubricName}
                onChange={(n) => { handleNameChange(n.target.value) }}
            />

            <div className="NewRubric__itemsTitle"> Rubric Items </div>

            {rubricItemData && rubricItemData.length > 0 &&
                rubricItemData.map((item, i) => (
                    <div key={i} className="NewRubric__itemDisplay">
                        <RubricItem
                            key={`itemID_${item.frontFacingIndex}`}
                            name={item.rubricItem.explanation}
                            points={item.rubricItem.point_value !== undefined && item.rubricItem.point_value !== null
                                ? Math.abs(item.rubricItem.point_value).toString() : ""}
                            impact={item.impact}
                            onChange={(newItem) => handleItemChange(item.frontFacingIndex, newItem)}
                        />


                        <Button 
                            key={`delete_id${item.frontFacingIndex}`}
                            href=""
                            variant="secondary"
                            onClick={() => {deleteItem(item.frontFacingIndex)}}> 
                            <FaRegTrashAlt />
                        </Button>
                    </div>

                ))
            }




            <Button href="" variant="secondary" onClick={addNewItem}> + Add a new item </Button>


            <div className="NewRubric__decisionButtons">
                <Button href="" variant="secondary" onClick={backButton}> Cancel </Button>
                <Button href="" onClick={saveRubric}> Save rubric </Button>
            </div>
        </div>
    );
};

export default RubricEditor;