import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { postClassroom } from "@/api/classrooms";
import { SelectedClassroomContext } from "@/contexts/selectedClassroom";
import Panel from "@/components/Panel";
import Button from "@/components/Button";
import { useMutation } from "@tanstack/react-query";
import { useOrganizationDetails } from "@/hooks/useOrganization";
import { useClassroomNames } from "@/hooks/useClassroomNames";
import { useClassroomValidation } from "@/hooks/useClassroomNames";

import "./styles.css";
import Input from "@/components/Input";
import GenericDropdown from "@/components/Dropdown";
import LoadingSpinner from "@/components/LoadingSpinner";

const ClassroomCreation: React.FC = () => {
  const [name, setName] = React.useState("");
  const [showCustomNameInput, setShowCustomNameInput] = React.useState(false);
  const { setSelectedClassroom } = useContext(SelectedClassroomContext);
  const navigate = useNavigate();
  const location = useLocation();
  const orgID = location.state?.orgID;

  const { data: predefinedClassroomNames = [], isError: isNamesError } = useClassroomNames(
    (firstClassName: string) => {
      if (!name) {
        setName(firstClassName);
      }
    }
  );

  const { data: classroomExists = false } = useClassroomValidation(name);
  const allClassroomNames = [...predefinedClassroomNames, "Custom"];
  const { data: organization, isLoading: isOrgLoading, error: orgError } = useOrganizationDetails(orgID);

  const createClassroomMutation = useMutation({
    mutationFn: postClassroom,
    onSuccess: (createdClassroom: IClassroom) => {
      setSelectedClassroom(createdClassroom);
      navigate("/app/classroom/invite-tas");
    }
  });

  const handleNameChange = (selected: string) => {
    if (selected === "Custom") {
      setShowCustomNameInput(true);
      setName("");
    } else {
      setShowCustomNameInput(false);
      setName(selected);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !organization) {
      return;
    }
    
    createClassroomMutation.mutate({
      name: name,
      org_id: organization.id,
      org_name: organization.login,
    });
  };

  return (
    <Panel title="New Classroom" logo={true}>
      <div className="ClassroomCreation">
        {isOrgLoading ? (
          <LoadingSpinner />
        ) : (
          <form onSubmit={handleSubmit}>
            <Input
              label="Organization name"
              name="organization"
              required
              readOnly
              value={organization ? organization.login : ""}
            />

            {allClassroomNames.length > 0 && (
              <GenericDropdown
                labelText="Classroom name"
                selectedOption={showCustomNameInput ? "Custom" : name}
                loading={false}
                options={allClassroomNames.map(option => ({ value: option, label: option }))}
                onChange={handleNameChange}
              />
            )}

            {(showCustomNameInput || allClassroomNames.length === 0) && (
              <Input
                label="Custom classroom name"
                name="classroom-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            {(createClassroomMutation.error || orgError || isNamesError) && (
              <p className="error">
                {createClassroomMutation.error
                  ? "Failed to create classroom. Please try again."
                  : orgError
                  ? "Failed to fetch organization details. Please try again."
                  : "Failed to fetch classroom names. Please try again."}
              </p>
            )}
            
            {!organization && (
              <p className="error">
                <Link to="/app/organization/select">
                  Click here to select an organization
                </Link>
                .
              </p>
            )}
            <div className="ClassroomCreation__buttonWrapper">
              <Button 
                type="submit" 
                disabled={createClassroomMutation.isPending || classroomExists}
                variant={createClassroomMutation.isPending || classroomExists ? "disabled" : "primary"}
              >
                {createClassroomMutation.isPending ? "Creating..." : "Create Classroom"}
              </Button>
              <Button variant="secondary" href="/app/organization/select">
                Select a different organization
              </Button>
            </div>
          </form>
        )}
      </div>
    </Panel>
  );
};

export default ClassroomCreation;
