import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";

const getSelectedClassName = (active) => {
	let classNames = ''
	if (active) {
		classNames = 'bg-gray-100 block px-4 py-2 text-sm text-gray-700'
	} else {
		classNames = 'block px-4 py-2 text-sm text-gray-700'
	}

	return classNames
}

const UserAvatar = () => {
	const { logout } = useAuth0()
	return (
		<Menu as="div" className="relative">
			<div>
				<Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
					<span className="sr-only">Open user menu</span>
					<img
						className="h-10 w-10 rounded-full"
						src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
						alt=""
					/>
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
				<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
					<Menu.Item>
						{({ active }) => (
							<Link to="#"
								className={getSelectedClassName(active)}
							>
								Your Profile
							</Link>
						)}
					</Menu.Item>
					<Menu.Item>
						{({ active }) => (
							<Link to="#"
								className={getSelectedClassName(active)}
							>
								Settings
							</Link>
						)}
					</Menu.Item>
					<Menu.Item>
						{({ active }) => (
							<Link onClick={() =>
								logout({
									returnTo: window.location.origin,
								})} className={getSelectedClassName(active)}>
								Log Out
							</Link>
						)}
					</Menu.Item>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}

export default UserAvatar
