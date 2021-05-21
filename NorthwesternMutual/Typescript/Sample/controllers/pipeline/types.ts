// New Pipeline
interface PipelineBody {
  name: string;
  description: string;
  isRunning: boolean;
  data: {
    type: string;
    moduleId: string;
  }[];
}
