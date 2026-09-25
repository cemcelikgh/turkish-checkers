'use client';

import { AppStore, makeStore } from '@/lib/store';
import { Provider } from 'react-redux';
import { useState } from 'react';

function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [store] = useState<AppStore>(makeStore);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );

}

export default StoreProvider;
