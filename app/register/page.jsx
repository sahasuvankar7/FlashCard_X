import {getServerSession} from 'next-auth'
import { redirect } from 'next/navigation';
import FormPage from  "./form"
import { auth } from '@/auth';
export default async function RegisterPage(){
    const session = await auth();
    const user = session?.user;
    if(!user){
        redirect("/register")
    }
    return (
        <section className="bg-pink-300 h-screen flex items-center justify-center text-black">
<div className="w-[600px]">
    
    <FormPage/>
</div>

        </section>
    )
}