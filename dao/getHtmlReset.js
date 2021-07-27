module.exports = function(name , link) {
    return `
    <table width="580" class="m_5739889038515235559deviceWidth" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#ffffff" style="border-collapse:collapse;margin:0 auto">
    <tbody><tr>
      <td valign="top" align="center" style="padding:0" bgcolor="#ffffff">
        <a href="http://127.0.0.1:3000" target="_blank">
          <img class="m_5739889038515235559deviceWidth CToWUd" src="https://lh3.googleusercontent.com/yxezsb6C9SfKgHd0EcCpyZ7z5TyiUgE5XHRA5TXAcFu5RoVC6GpEf_3eyCXsbIWwVJBfSM6b08UX4fsWtLuTD7jOUztqhIET16F8uPuyQqy8_LTmhF822po-a_VSD2r8y-rea_TgBg=s40-p-k?source=screenshot.guru" alt="" border="0" width="125" style="display:block">
        </a>
      </td>
    </tr>
    <tr>
      <td style="font-size:13px;color:#282828;font-weight:normal;text-align:left;font-family:'Open Sans',sans-serif;line-height:24px;vertical-align:top;padding:15px 8px 10px 8px" bgcolor="#ffffff">
        <h1 style="text-align:center;font-weight:600;margin:30px 0 50px 0">PASSWORD RESET REQUEST</h1>
        <p>Dear ${name},</p>
          <p>We have received your request to reset your password. Please click the link below to complete the reset:</p>
          </td>
          </tr>
          <tr>
              <td style="padding-bottom:30px">
                  <a href="${link}" style="padding:10px;width:300px;display:block;text-decoration:none;border:1px solid #ff6c37;text-align:center;font-weight:bold;font-size:14px;font-family:'Open Sans',sans-serif;color:#ffffff;background:#ff6c37;border-radius:5px;line-height:17px;margin:0 auto">
                    Reset My Password
                </a>
            </td>
          </tr>
          <tr>
              
        </tr>
  </tbody></table>
    `
}