export default function isInside
<C extends Node, P extends Node>
(child: C, parent: P | null): boolean {
  return (child && parent) ? parent.contains(child) : false
}
