import colors from 'colors';
import { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next: NextFunction): void => {
  const methodColors: Record<string, keyof typeof colors> = {
    GET: 'green',
    POST: 'blue',
    PUT: 'yellow',
    DELETE: 'red',
  };

  const color = methodColors[req.method] || 'white';

  console.log(
    (colors[color] as (text: string) => string)(
      `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
    )
  );
  next();
};

export default logger;
