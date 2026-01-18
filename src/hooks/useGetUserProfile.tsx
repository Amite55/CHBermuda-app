import { useGetProfileQuery } from "../redux/Api/authSlices";

export const useProfile = () => {
  const query = useGetProfileQuery(undefined);

  return {
    profileData: query?.data,
    isProfileLoading: query?.isLoading || query?.isFetching,
    profileRefetch: query?.refetch,
    isProfileFetching: query?.isFetching,
    isProfileError: query?.isError,
  };
};
