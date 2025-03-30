   "use client";
   
   import { useSession, signIn, signOut } from "next-auth/react";
   
   export default function Dashboard() {
     const { data: session, status } = useSession();
     console.log("session: ", session);
     console.log("status: ", status);
   
     if (status === "loading") return <p>Loading session...</p>;
   
     return (
       <>
         {status === "authenticated" ? (
            <>
              <div className="profil-text">
                <p>User: {session.user.name}</p>
                <p>Email: {session.user.email}</p>
              </div>
            </>
          ) : (
            <>
            </> 
          )}
      </>
    );
  }
  

