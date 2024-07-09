import { useApolloClient, useMutation } from "@apollo/client"
import { LOGIN } from "../graphql/queries"
import useAuthStorage from "./useAuthStorage"

const useSignIn = () => {
    const [mutate, result] = useMutation(LOGIN)
    const authStorage = useAuthStorage()
    const apolloClient = useApolloClient()

    const singIn = async({ username, password }) => {
        const response = await mutate({
            variables: { credentials: { username, password } }
        })

        console.log('useSignIn: ', response);

        if (response) {
            await authStorage.setAccessToken(response.data.authenticate.accessToken)
            console.log('token is saved');
            apolloClient.resetStore()
            console.log('resetting the store');
        }
        return response
    }

    return [singIn, result]
}

export default useSignIn