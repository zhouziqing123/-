$(function () {
  var form = layui.form
  var layer = layui.layer
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在 1 ~ 6 个字符之间！'
      }
    }
  })

  /**
   * 初始化用户的基本信息
   */
  initUserInfo()
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败！')
        }

        form.val('formUserInfo', res.data)
      }
    })
  }

  /**
   * 重置表单的数据
   */
  $('#btnReset').on('click', function (e) {
    // 阻止表单的默认重置行为
    e.preventDefault()
    initUserInfo()
  })

  /**
   * 更新用户资料
   */
  $('.layui-form').on('submit', function (e) {
    // 阻止表单的默认提交行为
    e.preventDefault()

    // 发起 ajax 数据请求
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新用户信息失败！')
        }
        layer.msg('更新用户信息成功！')
        // 调用父页面中的方法，重新渲染用户的头像和用户的信息
        window.parent.getUserInfo()
      }
    })
  })
})