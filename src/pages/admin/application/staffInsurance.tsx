import StaffInsuranceForm from '@root/src/components/Admin/Application/StaffInsuranceForm'
import dynamic from 'next/dynamic'
import React from 'react'
import useBaseHook from '@src/hooks/BaseHook'


const Layout = dynamic(() => import('@src/layouts/Admin'), { ssr: false })

const StaffInsurance = () => {

  return <>
    <div className="content">
        <StaffInsuranceForm />
    </div>
  </>
}

StaffInsurance.Layout = (props) => {
  const { t } = useBaseHook();

  return <Layout
    title={t("pages:application.staffInsuranceForm.title")}
    description={t("pages:application.staffInsuranceForm.description")}
    {...props}
  />
}

export default StaffInsurance

