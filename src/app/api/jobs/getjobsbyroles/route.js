
export async function POST(req, res) {

   const session = await getServerSession(authOptions);

   if (session) {
      if (session.role !== Role.ADMIN && session.role !== Role.RECRUITER) {
         return NextResponse.json({ message: "you are not allowed to get  jobs" }, { status: 401 })
      }
   }
   else {
      return NextResponse.json({ message: "you are not allowed to get jobs" }, { status: 401 })
   }

   try {



      const { roles } = await req.json();

      if (Array.isArray(roles)) {


         const jobs = await prisma.job.findMany({
            where: {
               role: {
                  in: roles
               }
            },
            include: {
               User: {
                  select: {
                     id: true,
                     username: true,
                     email: true,
                     name: true,
                  }
               }
            }
         });
      }

      return NextResponse.json(jobs, { status: 200 });
   }
   catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
   }
}