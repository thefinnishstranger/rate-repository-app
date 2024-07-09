import { useApolloClient, useQuery } from "@apollo/client"
import { useNavigate } from "react-router-native"
import { ME } from "../graphql/queries"
import useAuthStorage from "../hooks/useAuthStorage"
import { useEffect } from "react"

const useSignOut = () => {
    const { data, loading, refetch } = useQuery(ME, {
        fetchPolicy: 'cache-and-network'
    })
    const authStorage = useAuthStorage()
    const apolloClient = useApolloClient()
    const navigate = useNavigate()

    useEffect(() => {
        refetch()
    }, [])

    const signOut = async () => {
        await authStorage.removeAccessToken()
        apolloClient.resetStore()
        navigate('/')
    }

    return { signOut, data, loading }
}

export default useSignOut