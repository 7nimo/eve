import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css'
import { Index } from './pages/Index';
import { trpc } from './utils/trpc';

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: import.meta.env.VITE_API_URL,
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Index />
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App
