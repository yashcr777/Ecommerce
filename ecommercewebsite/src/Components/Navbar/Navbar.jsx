import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {Link, useNavigate} from 'react-router-dom'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { getCookie } from "../User/utils"
import axios from 'axios';
import {toast} from 'react-hot-toast'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function Navbar({children}) {
  const navigate=useNavigate();
  const [id, setId] = useState(JSON.parse(localStorage.getItem("id")))
  const [Role,setRole] = useState(getCookie("Role"))
  var d={name:"",email:""};
  const [data,SetData]=useState(d);
  function handleclick()
  {
    localStorage.clear();
    toast.success("Logout Sucessfully");
    navigate('/');
  }

  useEffect(()=>{
    const url=`https://localhost:7027/api/User/User/GetById/${id}`;
    axios
    .get(url)
    .then((result)=>{
        console.log(result)
        SetData({
            name:result.data.name,
            email:result.data.email,
        });
    })
    .catch((error)=>{
        console.log(error)
    })
},[localStorage.getItem("id")])

const user = {
  name: data.name,
  email: data.email,
  imageUrl:
    'https://th.bing.com/th/id/OIP.pV0bCnTY6ZWf5KRfHCEB_wAAAA?rs=1&pid=ImgDetMain',
}

const navigation = [
  id?{ name: 'Dashboard', href: '/userdashboard', current: true }:{name:'Dashboard',href:'/login',current:true},
  id?((Role!=="Admin")?{ name: 'Products', href: '/products', current: false }:{name: 'AllUsers', href: '/admindashboard', current: false }):{name: 'Products', href: '/login', current: false },
  id?((Role!=="Admin")?{ name: 'Cart', href:'/cart', current: false }:{name: 'AllProducts', href: '/products', current: false }):{name: 'Cart', href: '/login', current: false },
  id?((Role==="Admin")?{ name: 'Addproduct', href: '/addproduct', current: false }:{name: 'Orderlist', href: `/orderlist`, current: false }):{},
  // id?((Role==="Admin")?{ name: 'Allorders', href: '/allorders', current: false }:{name: 'Allorders', href: '/allorderss', current: false }):{},
  id?((Role==="Admin")?{ name: 'Update Product', href: '/updateproductadmin', current: false }:{}):{},
  id?((Role==="Admin")?{ name: 'All Orders', href: '/orderlist', current: false }:{}):{},  
  !id?{ name: 'Login', href: '/login', current: false }:{name:''},
  !id?{ name: 'SignUp', href: '/signup', current: false }:{name:''},
]
const userNavigation = [
  { name: 'Your Profile', href: '/profile' },
  { name: 'My Orders', href: '/orderlist' },
  { name: 'Sign out', href: '/logout' },
]

useEffect(() => {
setId(JSON.parse(localStorage.getItem("id")));
setRole(getCookie("Role"))
},[localStorage.getItem("id"),getCookie("Role")])
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <>
                         {item.name &&  <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>}
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                  {id?(<div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <Link to="/cart">
                      <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        {/* <span className="absolute -inset-1.5" /> */}
                        <span className="sr-only">View notifications</span>
                        <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      </Link>
                      <span className="inline-flex items-center rounded-md bg-red-50 mb-7 -ml-3 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                      {(localStorage.getItem("cart"))?JSON.parse(localStorage.getItem("cart")).length:0}
                    
                      </span>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (item.name!='Sign out')?(
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ):(<button onClick={handleclick} className='block px-4 py-2 text-sm text-gray-700'>Sign Out</button>))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>):(<div></div>)}
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <>
                    {item.name && <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>}
                    </>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white sticky">
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <Link to='/'>
            <button>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">E-commerce</h1></button></Link>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl  sm:px-6 lg:px-8  flex-col justify-center items-center">{children}</div>
        </main>
      </div>
    </>
  )
}