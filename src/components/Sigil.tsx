import { sigil, reactRenderer } from "@tlon/sigil-js";

const Sigil = (props: {
  id: string;
  size: number;
  colors: [string, string];
}) => {
  const { id, size, colors } = props;

  const _sigil = sigil({
    patp: id,
    renderer: reactRenderer,
    size: size,
    colors: colors,
  });

  return _sigil;
};

export default Sigil;
