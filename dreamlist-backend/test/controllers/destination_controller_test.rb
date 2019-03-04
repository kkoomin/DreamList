require 'test_helper'

class DestinationControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get destination_index_url
    assert_response :success
  end

  test "should get create" do
    get destination_create_url
    assert_response :success
  end

  test "should get show" do
    get destination_show_url
    assert_response :success
  end

end
