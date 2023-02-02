# ReactHook单元测试

@testing-library/react
@testing-library/react-hooks
jest

@testing-library/react 和 jest的区别

@testing-library/react
@testing-library/react-hooks 的区别


## @testing-library/react-hooks 都为我们做了什么

render;
rerender;（如何处理props的变化）
act;



细节：

##  如何完全mock一个module，防止环境不兼容

jest.mock('path/to/module', () => ({
    key: 'value',
    fn: jest.fn(),
}))

## 如何mock settimeout和setinterval

jest.useFakeTimers();
jest.advanceTimersByTime(2 * 1000);