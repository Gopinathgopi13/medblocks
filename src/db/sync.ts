const channel = new BroadcastChannel('pglite-sync');

export const broadcastChange = () => {
  channel.postMessage({ type: 'DB_UPDATED' });
};

export const onDbChange = (callback: () => void) => {
  channel.postMessage({ type: 'DB_UPDATED' });
  channel.onmessage = (event) => {
    if (event.data?.type === 'DB_UPDATED') {
      callback();
    }
  };
};
