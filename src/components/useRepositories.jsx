import { FETCH_REPOSITORIES } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const useRepositories = () => {
    const { data, error, loading, refetch } = useQuery(FETCH_REPOSITORIES, {
        fetchPolicy: 'cache-and-network'
    })

    if (error) {
        console.error('error fetching repositories', error)
    }

    const repositories = data
        ? data.repositories.edges.map(edge => edge.node)
        : []

        return { repositories, loading, refetch }

}

export default useRepositories