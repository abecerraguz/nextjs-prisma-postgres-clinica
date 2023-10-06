import Link from "next/link"
import Image from "next/image"
import Isotipo from "../../public/isotipo.png"


function NavBars() {
  return (

    <div className="navbar bg-neutral text-neutral-content fixed z-50">
      <div className="container m-auto md:w-full">

        <div className="navbar-start w-full flex justify-between md:justify-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 bg-base-100 rounded-box w-52 shadow-xl  bg-gradient-to-r from-slate-900 to-slate-700 relative z-50">
              <li><Link href='/'>Home</Link></li>
              <li><Link href='/pacientes'>Pacientes</Link></li>
              <li><Link href='/especialistas'>Especialistas</Link></li>
            </ul>
          </div>
          <Link className="btn btn-ghost normal-case text-xl inline-flex md:inline-flex" href='/'>
            <Image src={Isotipo} width={40} height={40} alt="logo" />
            <span>The Clinic</span>
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link href='/' className="text-base uppercase">Home</Link></li>
            <li><Link href='/pacientes' className="text-base uppercase">Pacientes</Link></li>
            <li><Link href='/especialistas' className="text-base uppercase">Especialistas</Link></li>
          </ul>
        </div>

      </div>

    </div>

    // <div className="drawer bg-neutral text-neutral-content fixed z-50">
    //   <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
    //   <div className="drawer-content flex flex-col">
    //     <div className="w-full navbar bg-neutral">
    //       <div className="flex-none lg:hidden">
    //         <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
    //           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
    //         </label>
    //       </div>
    //       <div className="flex-1 px-2 mx-2">
    //         <Link className="btn btn-ghost normal-case text-xl inline-flex md:inline-flex" href='/'>
    //           <Image src={Isotipo} width={40} height={40} alt="logo" />
    //           <span>The Clinic</span>
    //         </Link>

    //       </div>
    //       <div className="flex-none hidden lg:block">
    //         <ul className="menu menu-horizontal">
    //           {/* Navbar menu content here */}
    //           <li><Link href='/'>Home</Link></li>
    //           <li><Link href='/pacientes'>Pacientes</Link></li>
    //           <li><Link href='/especialistas'>Especialistas</Link></li>
    //         </ul>
    //       </div>
    //     </div>

    //   </div>
    //   <div className="drawer-side">
    //     <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
    //     <label htmlFor="my-drawer-3" className=" bg-slate-400">
    //       <ul className="menu p-4 w-80 min-h-full bg-base-200">

    //         <label htmlFor="my-drawer-3" className="flex text-xl content-end items-center justify-end"> X</label>
    //         <li><Link href='/'>Home</Link></li>
    //         <li><Link htmlFor="my-drawer-3" href='/pacientes'>Pacientes</Link></li>
    //         <li><Link href='/especialistas'>Especialistas</Link></li>


    //       </ul>
    //     </label>

    //   </div>
    // </div>
  )
}

export default NavBars



