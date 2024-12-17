import { TeamSettings } from 'components/interfaces/Organization'
import AppLayout from 'components/layouts/AppLayout/AppLayout'
import DefaultLayout from 'components/layouts/DefaultLayout'
import OrganizationLayout from 'components/layouts/OrganizationLayout'
import { Loading } from 'components/ui/Loading'
import { usePermissionsQuery } from 'data/permissions/permissions-query'
import { useSelectedOrganization } from 'hooks/misc/useSelectedOrganization'
import type { NextPageWithLayout } from 'types'

const OrgTeamSettings: NextPageWithLayout = () => {
  const { isLoading: isLoadingPermissions } = usePermissionsQuery()
  const selectedOrganization = useSelectedOrganization()

  return (
    <>
      {selectedOrganization === undefined && isLoadingPermissions ? <Loading /> : <TeamSettings />}
    </>
  )
}

OrgTeamSettings.getLayout = (page) => (
  <AppLayout>
    <DefaultLayout>
      <OrganizationLayout>{page}</OrganizationLayout>
    </DefaultLayout>
  </AppLayout>
)
export default OrgTeamSettings
