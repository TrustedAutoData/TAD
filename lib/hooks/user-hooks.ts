import {useAtom} from "jotai/index";
import {
    selectedDetailedUserAtom,
    selectedUserAtom,
    selectedUserIdAtom,
    usersAtom,
    usersLoadingAtom,
    usersPaginationAtom,
    usersTableAtom
} from "@/lib/store";
import {useCallback} from "react";
import {getTableUsers, getUser, getUserDetailed} from "@/actions/users/get-users";
import * as api from "@/lib/api/api-client";

export function useUsers() {
    const [users, setUsers] = useAtom(usersAtom)
    const [tableUsers, setTableUsers] = useAtom(usersTableAtom)
    const [loading, setLoading] = useAtom(usersLoadingAtom)
    const [selectedUserId, setSelectedUserId] = useAtom(selectedUserIdAtom)
    const [selectedUser, setSelectedUser] = useAtom(selectedDetailedUserAtom);
    const [pagination, setPagination] = useAtom(usersPaginationAtom)

    const fetchUsers = useCallback(
        async (params?: { search?: string; page?: number; pageSize?: number }) => {
            setLoading(true)
            try {
                const response = await getTableUsers({
                    ...params,
                    page: params?.page ?? pagination.page,
                    pageSize: params?.pageSize ?? pagination.pageSize,
                })
                setTableUsers(response.data.data)
                setPagination((prev) => ({
                    ...prev,
                    total: response.data.total,
                    totalPages: response.data.totalPages,
                }))
            } catch (error) {
                console.error("Error fetching users:", error)
            } finally {
                setLoading(false)
            }
        },
        [setTableUsers, setLoading, setPagination, pagination.page, pagination.pageSize],
    )

    const changePage = useCallback(
        (page: number) => {
            setPagination((prev) => ({ ...prev, page }))
            fetchUsers({ page })
        },
        [setPagination, fetchUsers],
    )
    const fetchUserDetailed = useCallback(
        async (id: string) => {
            setLoading(true);
            try {
                const response = await getUserDetailed(id);
                setSelectedUser(response.data);
                setSelectedUserId(id);
            } catch (error) {
                console.error(`Error fetching detailed user ${id}:`, error);
            } finally {
                setLoading(false);
            }
        },
        [setSelectedUser, setSelectedUserId, setLoading],
    );

    const fetchUser = useCallback(
        async (id: string) => {
            setLoading(true)
            try {
                const response = await getUser(id)
                setUsers((prev) => {
                    const index = prev.findIndex((user) => user.id === id)
                    if (index >= 0) {
                        return [...prev.slice(0, index), response.data, ...prev.slice(index + 1)]
                    }
                    return [...prev, response.data]
                })
                setSelectedUserId(id)
            } catch (error) {
                console.error(`Error fetching user ${id}:`, error)
            } finally {
                setLoading(false)
            }
        },
        [setUsers, setLoading, setSelectedUserId],
    )

    const createUser = useCallback(
        async (user: Omit<any, "id">) => {
            setLoading(true)
            try {
                const response = await api.createUser(user)
                setUsers((prev) => [...prev, response.data])
                return response.data
            } catch (error) {
                console.error("Error creating user:", error)
                throw error
            } finally {
                setLoading(false)
            }
        },
        [setUsers, setLoading],
    )

    const updateUser = useCallback(
        async (id: string, user: Partial<any>) => {
            setLoading(true)
            try {
                const response = await api.updateUser(id, user)
                setUsers((prev) => {
                    const index = prev.findIndex((u) => u.id === id)
                    if (index >= 0) {
                        return [...prev.slice(0, index), response.data, ...prev.slice(index + 1)]
                    }
                    return prev
                })
                return response.data
            } catch (error) {
                console.error(`Error updating user ${id}:`, error)
                throw error
            } finally {
                setLoading(false)
            }
        },
        [setUsers, setLoading],
    )

    const deleteUser = useCallback(
        async (id: string) => {
            setLoading(true)
            try {
                await api.deleteUser(id)
                setUsers((prev) => prev.filter((user) => user.id !== id))
                if (selectedUserId === id) {
                    setSelectedUserId(null)
                }
            } catch (error) {
                console.error(`Error deleting user ${id}:`, error)
                throw error
            } finally {
                setLoading(false)
            }
        },
        [setUsers, setLoading, selectedUserId, setSelectedUserId],
    )

    return {
        users,
        tableUsers,
        loading,
        selectedUserId,
        selectedUser,
        pagination,
        setSelectedUserId,
        fetchUsers,
        fetchUser,
        createUser,
        updateUser,
        deleteUser,
        changePage,
        fetchUserDetailed
    }
}
