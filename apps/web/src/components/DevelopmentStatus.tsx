import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Code, GitBranch, Calendar } from "lucide-react";

const DevelopmentStatus = () => {
  const buildInfo = {
    version: "v2.1.3-beta",
    status: "en desarrollo",
    lastBuild: "2024-01-15 22:30",
    nextRelease: "2024-02-01",
    branch: "main",
    commit: "a1b2c3d"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "en desarrollo":
        return "bg-yellow-500";
      case "beta":
        return "bg-orange-500";
      case "stable":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="terminal-border">
      <CardHeader>
        <CardTitle className="font-terminal flex items-center space-x-2">
          <Code className="h-5 w-5" />
          Estado de Desarrollo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-terminal">Versión:</span>
          <Badge variant="outline" className="font-terminal">
            {buildInfo.version}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-terminal">Estado:</span>
          <Badge className={`font-terminal ${getStatusColor(buildInfo.status)}`}>
            {buildInfo.status.toUpperCase()}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-terminal">Última compilación:</span>
          <span className="text-sm font-terminal text-muted-foreground">
            {buildInfo.lastBuild}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-terminal">Próxima versión:</span>
          <span className="text-sm font-terminal text-muted-foreground">
            {buildInfo.nextRelease}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-terminal">Rama:</span>
          <div className="flex items-center space-x-2">
            <GitBranch className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm font-terminal text-muted-foreground">
              {buildInfo.branch}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-terminal">Commit:</span>
          <span className="text-sm font-terminal text-muted-foreground font-mono">
            {buildInfo.commit}
          </span>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-sm">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-terminal text-yellow-500">
              Esta aplicación está en desarrollo activo. Algunas funciones pueden no estar disponibles.
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DevelopmentStatus; 