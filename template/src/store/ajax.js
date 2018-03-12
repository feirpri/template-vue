export default {
    state: {
        errors: [],
        pending: [],
    },
    mutations: {
        ajax_error_push(state, data) {
            if (data) {
                state.errors.push(data);
            }
        },
        ajax_error_clear(state) { // 清空接口错误信息
            const stateAlias = state;
            stateAlias.errors = [];
        },
        ajax_pending_pop(state) {
            const stateAlias = state;
            stateAlias.pending.pop();
        },
        ajax_pending_push(state, data) {
            const stateAlias = state;
            stateAlias.pending.push(data);
        },
    },
};
