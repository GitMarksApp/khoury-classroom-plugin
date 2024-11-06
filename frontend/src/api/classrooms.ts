const base_url: string = import.meta.env.VITE_PUBLIC_API_DOMAIN as string;

export async function getClassroomsInOrg(
  orgId: number
): Promise<IClassroomListResponse> {
  const response = await fetch(`${base_url}/orgs/org/${orgId}/classrooms`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const resp: IClassroomListResponse = await response.json();
  return resp;
}

export async function postClassroom(
  classroom: Omit<IClassroom, "id">
): Promise<IClassroom> {
  const response = await fetch(`${base_url}/classrooms`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(classroom),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const resp: IClassroomResponse = await response.json();
  return resp.classroom;
}

export async function postClassroomToken(
  classroomId: number,
  role: string,
  duration?: number // Duration is optional
): Promise<IClassroomToken> {
  const response = await fetch(`${base_url}/classrooms/classroom/${classroomId}/token`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      classroom_role: role,
      duration: duration,
      })
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const resp: IClassroomToken = await response.json();
  return resp;
}

export async function useClassroomToken(
  token: string
): Promise<IClassroomJoinResponse> {
  const response = await fetch(`${base_url}/classrooms/classroom/token/${token}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const resp: IClassroomJoinResponse = await response.json();
  return resp;
}
