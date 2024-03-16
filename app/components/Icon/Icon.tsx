import * as icons from './icons';
import { ThemeIcon, ThemeIcons } from './type';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: ThemeIcon;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = ({ name, size, color, ...rest }) => {
  const DEFAULT_SIZE = 20;
  const ICONS: ThemeIcons = icons;
  const iconColor = color || 'currentColor';
  const svgFile = name && ICONS?.[name as keyof typeof ICONS];

  const iconHeight = size || DEFAULT_SIZE;
  const iconWidth = size || DEFAULT_SIZE;

  return (
    <svg
      {...rest}
      width={iconWidth}
      height={iconHeight}
      color={iconColor}
      dangerouslySetInnerHTML={{ __html: svgFile }}
    />
  );
};

export default Icon;
