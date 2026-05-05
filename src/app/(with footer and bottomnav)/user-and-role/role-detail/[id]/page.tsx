import RoleDetail from "./RoleDetail";

type PageProps = {
    params: any
}

const page = async ({ params }: PageProps) => {
    const { id } = await params;
    //roleDetail?.data?.getRole?.items?.[0] ??
  return (
    <div>
            <RoleDetail
                roleDetail={ {}}
                
                roleDropdown={{}}
            />
        </div>
  )
}

export default page