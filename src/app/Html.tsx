'use client';

import { selectTheme } from "@/lib/features/themeSlice";
import { useAppSelector } from "@/lib/hooks";

function Html({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const theme = useAppSelector(selectTheme);

  return (
    <html
      lang="tr"
      className={theme}
      style={{ colorScheme: theme }}
    >
      <head>
        {theme &&
        <link
          rel="icon"
          href={`/theme-icons/${theme}-board.svg`}
          type="image/svg+xml"
        />}
      </head>
      <body>
        {children}
      </body>
    </html>
  );

}

export default Html;
