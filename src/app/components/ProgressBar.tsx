interface ProgressBarProps {
  progress: number;
  message: string;
}

export default function ProgressBar({ progress, message }: ProgressBarProps) {
  return (
    <>
      <div className="w-full bg-slate-700 rounded-full h-4">
        <div className="bg-cyan-500 h-4 rounded-full" style={{width: `${progress}%`}}></div>
      </div>
      <p className="mt-2 text-sm text-slate-400">{message}</p>
    </>
  );
}
