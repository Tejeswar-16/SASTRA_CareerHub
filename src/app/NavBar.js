import Image from "next/image";

export default function NavBar({username,email,handleLogoClick,handleLogout}){
    return (
        <>
            <div className="mx-auto bg-white border border-b-4 border-r-2 p-2 rounded-xl shadow-xl w-75 md:w-190 lg:w-250">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row justify-left items-center">
                        <Image onClick={() => handleLogoClick()} className="hover:cursor-pointer" src={"/logo.png"} width={60} height={20} alt="Logo"></Image>
                        <div className="flex flex-col">
                            <div className="select-none font-sans font-bold text-lg md:text-2xl">Welcome, {username}</div>
                            <div className="select-none font-sans font-semibold text-sm md:text-sm">{email}</div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center md:space-x-6">
                        <div  className="rounded-lg shadow-3xl p-1">
                            <Image className="hover:cursor-pointer" onClick={() => handleLogout()} src="/logout.png" width={35} height={20} alt="logout"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}