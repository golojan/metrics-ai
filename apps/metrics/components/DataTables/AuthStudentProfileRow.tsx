import React, { useEffect } from 'react'
import Image from 'next/image'
import { AuthUserInfo, MembershipTypes } from '../../libs/interfaces'
import { toast } from 'react-toastify'

type Props = {
    row: {
        rowData: AuthUserInfo
    }
}

const AuthStudentProfileRow = (Props: Props) => {
    const apiUri = process.env.NEXT_PUBLIC_API_URI;
    const { row } = Props
    const { rowData } = row;

    const [isPHD, setIsPHD] = React.useState<boolean>(Boolean(rowData.isPHD));
    const [isPGD, setIsPGD] = React.useState<boolean>(Boolean(rowData.isPGD));
    const [membership, setMembership] = React.useState<string>(rowData.membershipType);

    const processUpdates = async (e: React.SyntheticEvent, userId: string) => {
        e.preventDefault();
        const fetcher = await fetch(`${apiUri}students/update/${userId}/ajax`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isPHD: isPHD,
                isPGD: isPGD,
                membershipType: membership
            })
        });
        const { status, modifiedCount } = await fetcher.json();
        if (status && modifiedCount) {
            toast.success(`Profile Updated`, {
                toastId: 'account-update-success',
            });
        } else {
            toast.error(`An error occured, please try again later...`, {
                toastId: 'account-update-error',
            });
        }
    };

    return (
        <div className='m-1 min-h-[50px] relative' key={rowData._id}>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-2 col-xl-2">
                    <div className='rounded-4 bg-gradient-to-t from-[#c5a9a9] to-[#fdeded] min-h-[50px] text-center items-center py-4'>
                        <button className='btn-primary p-2 rounded-4'>
                            <Image alt={`${rowData.fullname}`} src={rowData.picture} width={100} height={100} className='rounded-[50%] mx-auto' />
                        </button>
                        <p>
                            <span className='text-[#01579b] font-bold'>{rowData.fullname}</span><br />
                            <em>click to change photo</em>
                        </p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl4 col-auto">
                            <div className='rounded-4 border border-green-600 min-h-[50px] p-2  bg-gradient-to-t from-[#ffffff] to-[#ece9e9] box-border shadow'>
                                <form action="/action_page.php">
                                    <div className="form-group my-1">
                                        <div className='text-gray-400 w-full border-b border-b-gray-300 pb-1 py-1'>Last Name: <span className='text-black float-right active:border-collapse'>{rowData.lastname}</span></div>
                                        <div className='text-gray-400 w-full border-b border-b-gray-300 pb-1 py-1'>First Name: <span className='text-black float-right'>{rowData.firstname}</span></div>
                                        <div className='text-gray-400 w-full border-b border-b-gray-300 pb-1 py-1'>Middle Name: <span className='text-black float-right'>{rowData.middlename}</span></div>
                                        <div className='text-gray-400 w-full border-b border-b-gray-300 pb-1 py-1'>Email Address: <span className='text-black float-right'>{rowData.email}</span></div>
                                        <div className='text-gray-400 w-full border-b border-b-gray-300 pb-1 py-1'>Telephone Number: <span className='text-black float-right'>{rowData.mobile}</span></div>
                                        <div className='text-gray-400 w-full border-b border-b-gray-300 pb-1 py-1'>Gender: <span className='text-black float-right'>{rowData.gender}</span></div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl4 col-auto">
                            <div className='rounded-4 border border-green-600 min-h-[50px] p-2  bg-gradient-to-t from-[#ffffff] to-[#ece9e9] box-border shadow'>
                                <form onSubmit={(e) => processUpdates(e, rowData._id)}>
                                    <div className="form-group my-1">
                                        <div className='text-gray-400 w-full border-b border-b-gray-300 py-2 relative'>International Lecturer:
                                            <div className="form-check form-switch float-right absolute top-0 right-0">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="membershipType"
                                                    name="membershipType"
                                                    defaultChecked={membership === String(MembershipTypes.INTERNATIONAL)}
                                                    onChange={
                                                        (e) => {
                                                            setMembership(e.target.checked ? MembershipTypes.INTERNATIONAL : MembershipTypes.LOCAL);
                                                        }
                                                    }
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="membershipType"
                                                />
                                            </div>
                                        </div>

                                        <div className='text-gray-400 w-full border-b border-b-gray-300 py-2 relative'>PHD Student:
                                            <div className="form-check form-switch float-right absolute top-0 right-0">

                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="isPHD"
                                                    name='isPHD'
                                                    defaultChecked={isPHD}
                                                    onChange={
                                                        (e) => {
                                                            setIsPHD(e.target.checked ? true : false);
                                                        }
                                                    }
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="isPHD"
                                                />
                                            </div>
                                        </div>

                                        <div className='text-gray-400 w-full border-b border-b-gray-300 py-2 relative'>PGD Student:
                                            <div className="form-check form-switch float-right absolute top-0 right-0">

                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="isPGD"
                                                    name='isPGD'
                                                    defaultChecked={isPGD}
                                                    onChange={
                                                        (e) => {
                                                            setIsPGD(e.target.checked ? true : false);
                                                        }
                                                    }
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="isPGD"
                                                />
                                            </div>
                                        </div>


                                        <div className="form-group my-1 text-right">
                                            <button type="submit" className="btn btn-primary btn-sm">Update Profile</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default AuthStudentProfileRow