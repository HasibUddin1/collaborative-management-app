import { useContext, useState } from "react";
import { AuthContext } from './../../providers/AuthProvider';
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { generateRandomId } from "../../helpers/generateRandomId/generateRandomId";
import { getUniqueTeamNames } from "../../helpers/getUniqueTeamNames/getUniqueTeamNames";

const SignUp = () => {

    // TODO: regex implementation is left for not filling the fields

    const { createUser, updateUsersProfile } = useContext(AuthContext)

    const [error, setError] = useState('')

    const teamNames = getUniqueTeamNames()

    const navigate = useNavigate()

    const handleSignUp = event => {
        event.preventDefault()

        const form = event.target
        const userName = form.userName.value
        const email = form.email.value
        const password = form.password.value
        const bio = form.bio.value
        const teamName1 = form.teamName1.value
        const teamName2 = form.teamName2.value
        const teamName = teamName1 || teamName2
        const token = import.meta.env.VITE_IMAGE_TOKEN

        if (!userName) {
            setError('Username field cannot be empty')
            return
        }

        if (!email) {
            setError('Email field cannot be empty')
            return
        }
        if (!password) {
            setError('Password field cannot be empty')
            return
        }

        if (!bio) {
            setError('Bio cannot be empty')
            return
        }

        if (!teamName || teamName === 'Select Your Team') {
            setError('You must select or create a team');
            return;
        }

        const regex = /^\S+$/;

        if (!regex.test(userName)) {
            setError('Username cannot contain space')
            return
        }

        setError('')
        const imageFile = form.image.files[0]
        const formData = new FormData()
        formData.append('image', imageFile)

        fetch(`https://api.imgbb.com/1/upload?key=${token}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageResponse => {
                if (imageResponse.success) {
                    const image = imageResponse.data.display_url
                    if (!image) {
                        setError('Please insert an image of yours')
                        return
                    }

                    createUser(email, password)
                        .then(result => {
                            const createdUser = result.user
                            updateUsersProfile(createdUser, userName, image)
                                .then(() => {

                                    const userInfo = {
                                        id: generateRandomId(),
                                        userEmail: email,
                                        userName: userName,
                                        userImage: image,
                                        bio: bio,
                                        teamName: teamName
                                    }

                                    const existingUsers = JSON.parse(localStorage.getItem("users")) || []

                                    const updatedUsers = [...existingUsers, userInfo]

                                    localStorage.setItem("users", JSON.stringify(updatedUsers))
                                    navigate('/')
                                    toast.success('User has been created successfully')
                                })
                                .catch(error => {
                                    console.log(error)
                                    setError(error.message)
                                })
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
            })

    }

    return (
        <div className="my-20 px-20">
            <h1 className="text-4xl text-center font-semibold mb-5">Sign Up Now</h1>
            <form onSubmit={handleSignUp}>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="userName" id="floating_userName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_userName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User Name</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="email" name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="password" name="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <div className="flex items-center gap-5">
                    <div className="relative z-0 w-1/2 mb-6 group">
                        <input type="text" name="teamName1" id="floating_teamName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="floating_teamName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Team Name</label>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">Or</h1>
                    </div>
                    <div className="xl:w-1/2">
                        <label className="text-xl font-semibold" htmlFor="assign">Choose an Existing Team</label>
                        <select className="w-full px-4 py-2 rounded-lg block mt-2 border border-black" name="teamName2" id="assign">
                            <option value="Select Your Team" defaultChecked>Select Your Team</option>
                            {
                                teamNames?.map(teamName => <option key={teamName} value={teamName}>{teamName}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div className="flex flex-col w-1/2">
                    <label className="text-gray-600" htmlFor="bio">Bio</label>
                    <textarea style={{ resize: 'none' }} name="bio" className="border-2 border-gray-600 rounded-lg p-2" id="bio" cols="60" rows="5" required></textarea>
                </div>
                <div className="w-fit mb-5 mt-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">Upload Image</label>
                    <input name="image" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" required />
                </div>
                <div className="mb-3">
                    <Link to='/login' className="hover:underline text-blue-500 font-semibold">Already have an account?</Link>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>

                {error && <p className="text-red-600 font-bold text-center">Error: {error}</p>}
            </form>

        </div>
    );
};

export default SignUp;