"use client";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

export default function UserSession() {
  const [user, setUser] = useState<{ image: string; name: string } | null>(
    null
  );

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session?.user) {
        setUser({
          image: session.user.image || "",
          name: session.user.name || session.user.username || "Guest",
        });
      }
    };

    fetchSession();
  }, []);

  return (
    <div>
      {/* <h1 className="text-2xl font-semibold">Dashboard</h1> */}
      {/* <div className="flex flex-col justify-center items-center h-screen gap-2">
        <h2 className="text-3xl text-stone-700  p-8">
          Welcome {user?.name || "..."} to Dashboard
        </h2>
          {user?.image && (
            <img
            src={user.image}
            alt="User Image"
            className="w-24 h-24 rounded-full border"
            />
            )}
      </div> */}
            <iframe
              src="http://localhost:3000/"
              style={{ width: "100%", height: "100vh", border: "none" }}
              />
    </div>
  );
}

// This is my root page.tsx in /admin.
// import React from "react";
// import UserSession  from "./_components/UserSession"
// import SideNavbar from "./_components/SideNavbar";

// const page = async () => {
//   const { Image, Name } = await UserSession();

//   return (
//     <div className="h-screen bg-stone-100">
//       <SideNavbar Image={Image} Name={Name}/>

//     </div>
//   );
// };

// export default page;

// And now i want to render components which are in /admin/_components-

// Upload
// Active
// Completed
// Performance
// Settings

// in /admin/page.tsx

// on click o
