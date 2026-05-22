import { ProfileUser, AccountForm } from "@/components/account"

const AccountPage = () => {
    return (
       <div className="flex flex-col gap-6 w-full max-w-xl">
            <ProfileUser />
            <AccountForm />
        </div>
    )
}

export default AccountPage