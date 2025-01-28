import OAuthSignIn from '@/app/ui/components/auth/OAuthSignIn'
import { CardTitle, CardDescription, CardFooter } from '@/app/ui/components/shared/Card'
import { Card, CardHeader, CardContent } from '@mui/material'
import Link from 'next/link'


export default async function SignUpPage() {
  return (
    <div className='mx-auto'>
      <Card className='w- xl:w-[500px]'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Sign up</CardTitle>
          <CardDescription>
            Choose your preferred sign up method
          </CardDescription>
        </CardHeader>
        <CardContent className='grid grid-cols-1'>
          <OAuthSignIn />
        </CardContent>
        <CardFooter className='flex flex-wrap items-center justify-between gap-2'>
          <div className='text-sm text-muted-foreground'>
            <span className='mr-1 inline-block'>
              Already have an account?
            </span>
            <Link
              aria-label='Sign in'
              href='/sign-in'
              className='text-primary underline-offset-4 transition-colors hover:underline'>
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
