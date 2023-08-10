import logoRDB from "@/public/assets/icons/logordb.svg";
import { LogoCMS } from "@/components/styles/OtherStyles.styled.js";
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
      <html lang="pt-BR">
        <body>
          <Link href='/'>
            <div>
              <LogoCMS src={logoRDB} alt='RDB Logo' />
            </div>
          </Link>
          {children}
        </body>
      </html>
  )
}