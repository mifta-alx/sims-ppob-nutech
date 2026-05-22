import ProfileInfo from "@/components/profile-info"

const WithBalanceLayout = ({ children }) => {
    return (
        <div className="w-full max-w-6xl flex flex-col gap-10">
            <ProfileInfo />
            {children}
        </div>
    )
}

export default WithBalanceLayout