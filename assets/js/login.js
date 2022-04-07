$(function () {
  // 点击去注册的 a 标签
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击去登录的 a 标签
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 从 Layui 中获取到 form 对象
  var form = layui.form
  // 在 layui 中获取到 layer 对象
  var layer = layui.layer

  // 通过 form.verify() 函数自定义校验规则
  form.verify({
    // 自定义一个叫做 pwd 校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

    // 校验两次密码是否一致
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败，则 return 一个提示消息即可
      var pwd = $('.reg-box [name=password]').val()

      if (pwd !== value) {
        return '两次密码不一致'
      }
    }
  })

  // 监听注册表达的提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()

    const username = $('#form_reg [name=username]').val()
    const password = $('#form_reg [name=password]').val()

    $.post('/api/reguser', {
      username: username,
      password: password
    }, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }

      layer.msg('注册成功，请登录')

      // 模拟点击行为
      $('#link_login').click()
    })
  })

  /**
   * 登录功能的实现
   */
  $('#form_login').submit(function (e) {
    // 阻止默认提交行为
    e.preventDefault()

    $.ajax({
      url: '/api/login',
      method: 'post',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')

        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })
})