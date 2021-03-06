/**
 * 导出remove
 * @param {function} modelGetter - 模型获取函数
 * @param {Object} opts - 配置
 */
module.exports = (modelGetter, opts) => {
    return async function remove(name, cond) {
        try {
            const Model = modelGetter(name);
            const tombstoneKey = opts && (typeof opts.tombstoneKeyGetter === 'function') ? opts.tombstoneKeyGetter(name) : null;
            let result = null;
            if (tombstoneKey) {
                result = await Model.update(cond, { [tombstoneKey]: true });
            } else {
                result = await Model.remove(cond);
            }
            return result;
        } catch (error) {
            throw error;
        }
    };
};