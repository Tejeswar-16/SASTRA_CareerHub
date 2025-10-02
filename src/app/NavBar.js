import Image from "next/image";

export default function NavBar({username,email,darkMode,handleLogoClick,handleDarkMode,handleLightMode,handleLogout}){
    return (
        <>
            <div className="mx-auto bg-white p-2 rounded-xl shadow-xl w-75 md:w-190 lg:w-250">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row justify-left items-center">
                        <Image onClick={() => handleLogoClick()} className="hover:cursor-pointer" src={"/logo.png"} width={60} height={20} alt="Logo"></Image>
                        <div className="flex flex-col">
                            <div className="select-none font-sans font-bold text-lg md:text-2xl">Welcome, {username}</div>
                            <div className="select-none font-sans font-semibold text-sm md:text-sm">{email}</div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center md:space-x-6">
                        <div className="bg-gray-200 rounded-lg shadow-3xl p-2 mb-2 md:mb-0">
                            {darkMode && <Image onClick={() => handleLightMode()} className="cursor-pointer" src={"/sun.png"} width={28} height={20} alt="light mode"></Image>}
                            {!darkMode && <Image onClick={() => handleDarkMode()} className="cursor-pointer" src={"/moon.png"} width={28} height={20} alt="dark mode"></Image> }
                        </div>
                        <div  className="bg-gray-200 rounded-lg shadow-3xl p-1 hover:cusror-pointer">
                            <Image onClick={() => handleLogout()} src="/logout.png" width={35} height={20} alt="logout"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}