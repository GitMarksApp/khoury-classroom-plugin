interface IFullRubric {
    rubric: IRubric;
    rubric_items: IRubricItem[];
}

interface IRubric {
    id: number | null;
    name: string;
    org_id: number;
    classroom_id: number;
    reusable: boolean;
    created_at: Date | null;
}

interface IRubricItem {
    id: number | null;
    rubric_id: number | null;
    point_value: number | null;
    explanation: string;
    created_at: Date | null;
    deleted: boolean;
}

interface IFullRubricResponse {
    full_rubric: IFullRubric
}

interface IFullRubricsResponse {
    full_rubrics: IFullRubric[]
}
