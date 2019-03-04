require 'test_helper'

class DreamlistControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get dreamlist_index_url
    assert_response :success
  end

  test "should get create" do
    get dreamlist_create_url
    assert_response :success
  end

  test "should get show" do
    get dreamlist_show_url
    assert_response :success
  end

end
