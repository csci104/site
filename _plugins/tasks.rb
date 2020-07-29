require 'nokogiri'

module Jekyll::TasksFilter
  def tasks(html)
    result = ""
    task_lists(html).each do |list|
      result += list.inner_html
    end
    "<ul class=\"task-list\">" + result + "</ul>"
  end

  private

  def task_lists(html)
    document = Nokogiri::HTML::DocumentFragment.parse(html)
    task_lists_recursive(document, [])
  end

  def task_lists_recursive(node, result)
    node.children.each do |child|
      if child.name == "ul" and child.classes.include? "task-list"
        result.push(child)
      else
        task_lists_recursive(child, result)
      end
    end
    result
  end
end

Liquid::Template.register_filter(Jekyll::TasksFilter)
