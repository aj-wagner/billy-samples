import React, { useEffect, useState } from 'react';
import { Pane, toaster } from 'evergreen-ui';
import { useParams } from 'react-router-dom';
import fetcher from '../../Helpers/fetcher';
import GeneralInfo from './General.tsx';
import ActivePipeline from './ActivePipeline.tsx';
import DetailedInfo from './Detailed.tsx';
import { BACKEND_URL } from '../../Constants';

const Applicant = () => {
  const { id } = useParams();
  const [profileDetail, setProfileDetail] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const data = await fetcher(`${BACKEND_URL}/applicant/${id}`);
        setProfileDetail(data.data);
      } catch (e) {
        toaster.danger('Something wrong in our part. Please try again later.');
        console.error('[FetchApplicant] failed:', e);
      }
      setLoading(false);
    };
    fetchApplicant();
  }, [id]);

  return (
    <Pane justifyContent="center" marginX={100}>
      <GeneralInfo
        loading={loading}
        firstName={profileDetail?.firstName || ''}
        lastName={profileDetail?.lastName || ''}
        email={profileDetail?.email || ''}
      />
      <ActivePipeline />
      <DetailedInfo loading={loading} profile={profileDetail} />
    </Pane>
  );
};

export default Applicant;
