// === Automatically generated file. Don't edit it. ===
import _TestComponent from './TestComponent';
import Item from './Item';

type _TestComponent = typeof _TestComponent;

interface TestComponentType extends _TestComponent {
  Item: typeof Item;
}

const TestComponent = _TestComponent as TestComponentType;

TestComponent.Item = Item;

export default TestComponent;
