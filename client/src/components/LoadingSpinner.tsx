const LoadingSpinner = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50">
      <div className="text-center">
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-primary-100 border-t-primary-500" />
        <p className="mt-4 text-sm font-medium text-neutral-500">Loading Goa Yellow Pages...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
