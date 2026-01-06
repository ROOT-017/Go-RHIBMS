import { Alert, Card } from "antd";
import { Button } from "../design-system/buttons";
import { ReloadOutlined } from "@ant-design/icons";

export const DefaultErrorFallback = (p: { message?: string, onRetry?: () => void }) => 
    (
      <Card className="h-full w-full flex items-center justify-center flex-wrap ">
        <Alert
            message={p.message ?? 'Oop!! Something went wrong'}
            type="error"
            action={
                p.onRetry ? (
                  <Button size="small" danger onClick={() => p.onRetry?.()}>
                    <ReloadOutlined />
                  </Button>
                ) : null
            }
        />
      </Card>
    )