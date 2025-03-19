"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Users() {  
  const { data: session, status } = useSession({required: true}); // Automatically listens for session updates
  const [user, setUser] = useState<{ image: string; name: string } | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser({
        image: session.user.image || "",
        name: session.user.name || session.user.username,
      });
    }
  }, [session, status]); // Re-run when session changes

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1> 
       <div className="flex flex-col justify-center items-center h-screen gap-2">
        <h2 className="text-3xl text-stone-700  p-8">
          Welcome {user?.name || "Guest"} to Dashboard
        </h2>
          {user?.image && (
            <img
            src={user.image}
            alt="User Image"
            className="w-24 h-24 rounded-full border"
            />
            )}
      </div> 
    </div>
  );
}


