import { React, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Popover, Transition } from '@headlessui/react'
import { useAuth0 } from "@auth0/auth0-react";
import {
	BookmarkAltIcon,
	MenuIcon,
	HomeIcon,
	LinkIcon,
	XIcon,
	BellIcon,
} from '@heroicons/react/outline'
import SearchBar from './SearchBar'
import UserAvatar from './UserAvatar'



const Navbar = () => {
	const { logout, user } = useAuth0()

	return (
		<Popover className="">
			{({ open }) => (
				<>
					<div className="max-w-full bg-white h-24 inset-x-0 top-0 mx-auto px-4 sm:px-6 z-10">
						<div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
							
							{/* LOGO */}
							<div className="flex space-x-4 justify-start lg:w-0 lg:flex-1 items-center">
								<Link to="/feed">
									<span className="sr-only">Workflow</span>
									<span className="text-xl font-bold text-black-600">ScreenView</span>

								</Link>
								<SearchBar />

								
							</div>
							
							{/* small screen burger */}
							<div className="-mr-2 -my-2 md:hidden">
								<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
									<span className="sr-only">Open menu</span>
									<MenuIcon className="h-6 w-6" aria-hidden="true" />
								</Popover.Button>
							</div>


							<div className="hidden md:max-w-1/4 ml-10 md:flex items-center justify-center md:flex-1 lg:w-0">
								<Link to="/feed" className="ml-8 bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
									<HomeIcon className="h-6 w-6" aria-hidden="true" />
								</Link>
								<Link to="#" className="ml-8 bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
									<LinkIcon className="h-6 w-6" aria-hidden="true" />
								</Link>
								<Link to="#" className="ml-8 bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
									<BookmarkAltIcon className="h-6 w-6" aria-hidden="true" />
								</Link>
								<Link to="#" className="ml-8 bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
									<BellIcon className="h-6 w-6" aria-hidden="true" />
								</Link>
							</div>
							
							{/* UserAvatar */}
							<div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
								<div className="lg:mr-10">
									<UserAvatar/>
								</div>
								
							</div>
						</div>
					</div>

					<Transition
						show={open}
						as={Fragment}
						enter="duration-200 ease-out"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="duration-100 ease-in"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Popover.Panel
							focus
							static
							className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
						>
							<div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50 z-40">
								<div className="pt-5 pb-6 px-5">
									<div className="flex items-center justify-between">
										<div>
											<img className="h-10 w-10 rounded-full"
												src={user.picture}
												alt=""
											/>
										</div>
										<div className="-mr-2 ">
											<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
												<span className="sr-only">Close menu</span>
												<XIcon className="h-6 w-6" aria-hidden="true" />
											</Popover.Button>
										</div>
									</div>
								</div>
								<div className="py-6 px-5 space-y-6">
									<div className="grid grid-cols-2 gap-y-4 gap-x-8 flex justify-between">
										<Link to="/feed" className="ml-8 bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
											<HomeIcon className="h-6 w-6" aria-hidden="true" />
										</Link>
										<Link to="#" className="ml-8 bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
											<LinkIcon className="h-6 w-6" aria-hidden="true" />
										</Link>
										<Link to="#" className="ml-8 bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
											<BookmarkAltIcon className="h-6 w-6" aria-hidden="true" />
										</Link>
										<Link to="#" className="ml-8 bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
											<BellIcon className="h-6 w-6" aria-hidden="true" />
										</Link>
										<button
											className="ml-8 bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" onClick={() =>
											logout({
												returnTo: window.location.origin,
											})}
										>
											Log Out
										</button>
									</div>
								</div>
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	)
}

export default Navbar
