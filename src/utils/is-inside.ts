export default function isInside<
C extends Node,
P extends Node
>(child: C, parent: P): boolean {
  return parent.contains(child)
}
