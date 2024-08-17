"use server";
import { signIn, signOut } from "@/auth";
import prisma from "@/lib/db";
import { hash } from "bcryptjs";
// import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

class AuthError extends Error {
  constructor(message, type) {
    super(message);
    this.name = "AuthError";
    this.type = type;
  }
}
class RegistrationError extends Error {
  constructor(message, type) {
    super(message);
    this.name = "RegistrationError";
    this.type = type;
  }
}

const getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      console.log("you fucked up bro");
    }
    return user;
  } catch (error) {
    console.log(error);
    return(<div>error</div>);
  }
};

export const login = async (provider) => {
  await signIn(provider, { redirectTo: "/" });
  revalidatePath("/");
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};

export const loginWithCredentials = async ({email,password}) => {
  // const rawFormData = {
  //   email: formdata.get("email"),
  //   password: formdata.get("password"),
  //   role: "USER",
  //   redirectTo: "/cards",
  // };




  
  const existingUser = await getUserByEmail(email);
  console.log(existingUser);
  try {
   const result =  await signIn("credentials", {
      email,
      password,
      
    });
    if(result?.error){
      return {error:result.error}
    }
    // if (result?.ok) {
    //   revalidatePath("/");
    // }
    return { success: true, message: "Login successful" ,result};
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "invalid credentials" };
        default:
          return { error: "something went wrong" };
      }
    }
    // return null;
  }

  // window.location.reload(); 
  revalidatePath("/cards");
};

export const registerNewUserCredentials = async ({name,email,password}) => {
  // const rawFormData = {
  //   name: formdata.get("name"),
  //   email: formdata.get("email"),
  //   password: formdata.get("password"),
  //   role: "USER", // You can add a role field if needed
  //   redirectTo: "/login",
  // };

  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new RegistrationError("User already exists", "UserExists");
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Save user to database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    });

    console.log("User registered successfully", newUser);

    // Optionally, you can revalidate the path after registration
    revalidatePath("/login");

    return {
      success: true,
      message: "User registered successfully",
      user: newUser,
    };
  } catch (error) {
    if (error instanceof RegistrationError) {
      console.log(error.message);
      return { error: error.message };
    }
    console.error("Unexpected error during registration:", error);
    return { error: "An unexpected error occurred during registration." };
  }
};
